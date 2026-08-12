/* Service worker: hace que la app abra sin internet.
   Al cambiar cualquier archivo, subir el número de VERSION. */
var VERSION = "presupuestos-v3";

var ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icono.svg",
  "./icono-180.png",
  "./icono-512.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(VERSION)
      .then(function(c){ return c.addAll(ARCHIVOS); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(claves){
      return Promise.all(claves.map(function(k){
        if(k !== VERSION) return caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* Sirve primero lo guardado —así abre al instante y sin señal— y en paralelo
   busca la versión nueva para la próxima vez que la abra. */
self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;
  if(new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req, { ignoreSearch:true }).then(function(guardado){
      var red = fetch(req).then(function(resp){
        if(resp && resp.status === 200 && resp.type === "basic"){
          var copia = resp.clone();
          caches.open(VERSION).then(function(c){ c.put(req, copia); });
        }
        return resp;
      }).catch(function(){
        if(guardado) return guardado;
        /* sin internet y sin copia: si estaba abriendo la app, la servimos igual */
        if(req.mode === "navigate") return caches.match("./index.html");
        throw new Error("sin conexión");
      });
      return guardado || red;
    })
  );
});
