# **Registro de errores:**

#### Error 1)

**Registro**, la funcionalidad que permite agregar nuevos usuarios a la BD users, no funciona.

Muestra los siguientes errores en el navegador,

- "Failed to load resource: the server responded with a status of 400 (Bad Request)"
- "POST http://localhost:3000/api/user/register 400 (Bad Request)"
- "Error: Failed to register user at registro.html:38:42"

Segun el navegador el error se encuentra en `"./public/registro.html"`

```javascript
fetch("http://localhost:3000/api/user/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(Object.fromEntries(formData)),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to register user");
    }
    return response.json();
  })
  .then((data) => {
    console.log("User registered successfully", data);
  })
  .catch((error) => console.error("Error:", error));
```

**AVANCE:** Antes ni siquiera creaba al nuevo usuario de la BD. Ahora lo crea.

---

#### Error 2)

No funciona dentro del `"./public/logistica.html"` no funciona `"getChoferByDNI()"`, `"updateChofer()"` y `"deleteChofer()"`

**Resuelto:**

    Las rutas de "fetch(`http://localhost:3000/choferes/${dni}`)" para funcionar tiene que ser: fetch(`http://localhost:3000/api/logistica/choferes/${dni}`)

`updateChofer()` Necesita la siguiente linea: `const token=localStorage.getItem('token');`

`getChoferByDNI()` No enviaba una consulta HTTP correcta, necesitaba lo siguiente:

1. Por un lado necesita el token `consttoken=localStorage.getItem('token');`
2. Ademas:

   ```javascript
   const response = await fetch(
     `http://localhost:3000/api/logistica/choferes/${dni}`,
     { headers: { "auth-token": token } }
   );
   ```

   3. Verificar en logistica.js, sea asi: `router.get('/choferes/:dni', authMiddleware, async (req, res) => {`
