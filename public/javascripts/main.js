"use strict";

(function (w, d) {

    navigator.permissions.query({
        name: "geolocation"
    }).then(res => {
        geoLocation();
    })


    function geoLocation() {

        if (w.navigator.geolocation) {

            w.navigator.geolocation.getCurrentPosition(position => {

                const { accuracy, altitude, latitude, longitude, altitudeAccuracy, speed, heading } = position.coords

                setInterval(function(){

                    const date = new Date()
                    const time = date.toLocaleDateString().toString() + " " + date.toLocaleTimeString().toString()

                    fetch("/api/location", {
                        method: "POST",
                        body: JSON.stringify({
                            accuracy, latitude, longitude, altitude, altitude, altitudeAccuracy, speed, heading,time
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(res => res.json())
                        .then(response => {
                            console.log(response);
                        }).catch(err => {
                            console.log(err);
                        });

                }, parseInt((60 * 1000) / 3));

            });
        }
    }
})(window, document);