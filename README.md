# Stalldata

## Abstract

Stalldata is an application made to handle documentation of treatments made to pig pens on different farms. The app is supposed to be simple and intuitive for the user. Diffrent access levels will give you access to different functions. The data should be accessible through an API and in CSV format. An express web application will be used to serve the application and will work on every device that has a web browser.

## Application

### Structure

The application structure is built using a React frontend with a NodeJS Express backend with a NoSQL mongo database. The express backend sends the React application to all unused routes. This makes it possible to use Reacts client side routing.

For the built React app to be served it has to be recognized as a static file. This can be done in Express.

```ts
app.use(express.static("dist"));
```

## Authorization

Authentication will be handled using JWT. Middleware will handle the authentication and verify the access level. There is three middlewares that each verifies access on a new level. Users, CompanyAdmins, Admins.

```ts
app.get("/api/forusers", Protected, route);
app.get("/api/forcompanyadmins", ProtectedCompanyAdmin, route);
app.get("/api/foradmins", ProtectedAdmin, route);
```

To allow the JWT cookie to be sent, the credentials has to be allowed in the cors settings.

```ts
app.use(
  cors({
    credentials: true,
  })
);
```

Credentials must also be included when fetching the API route.

```ts
fetch("apipath", {
    ...
    credentials: "include"
})
```

## Authentication

### Login

The login route handles the authentication. It looks for a user with the inputed username and if it cant find one it sends bakc 401 Unauthorized status. If the user is found it will then take the encrypted password stored in the database and compare it against the inputed password. If it is a match a JWT will be sent with the response as a cookie followed by a 200 OK status.

```ts
const token = jwt.sign(
  { userid: dbUser._id, username: dbUser.username },
  "secret"
);
res.cookie("token", token);
```

### Sign Up

The signup route handles the creation of an account. It takes information about the user and then validates it. If everything is validated correctly the inputed password will be encrypted and a new User will be added to the database. After the user has been added to the database a JWT cookie will be sent to the user same as in the login route.
