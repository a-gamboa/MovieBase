var locationOrigin = window.location.origin;

if (!locationOrigin.includes("localhost")) {
    locationOrigin += "/MovieBase";
}