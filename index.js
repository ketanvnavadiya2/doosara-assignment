const riders = []; // riders list
const drivers = []; // drivers list
const distanceThreshold = 10; // maximum distance

function registerRider(id, name, xCordinate, yCordinate) { // you can register rider by this method
    riders.push({id, name, xCordinate, yCordinate})
}

function registerDriver(id, name, xCordinate, yCordinate, isAvailable) { // you can register driver by this method
    drivers.push({id, name, xCordinate, yCordinate, isAvailable})
}


function registerDriversAndRiders() { // registering some drivers and riders
    registerRider(1, 'Ketan', 10, 20);
    registerRider(2, 'Shyam', 10, 20);

    registerDriver(1, 'Mark', 20, 40, true);
    registerDriver(2, 'Rick', 10, 10, false);
    registerDriver(3, 'Andy', 30, 90, true);
    registerDriver(3, 'Jessy',60, 60, true);
}

function bookRide(user) { // this function will book the rider for given user
    let nearestDriverId = drivers[0].id;
    let shortestDistance = null;
    const availableDrivers = drivers.filter(driver => driver.isAvailable)

    for(let driver of availableDrivers) {
        let distance = ((driver.xCordinate - user.xCordinate) * (driver.xCordinate - user.xCordinate)) + 
                      ((driver.yCordinate - user.yCordinate) * (driver.yCordinate - user.yCordinate));
        
        if (distance > distanceThreshold) {
            continue;
        }

        if(!shortestDistance) {
            shortestDistance = distance;
            nearestDriverId = driver.id;
        } else {
            if (shortestDistance > distance) {
                shortestDistance = distance;
                nearestDriverId = driver.id;
            }
        }
    }

    const availabeDriver = availableDrivers.find((driver) => driver.id === nearestDriverId);
    if (availabeDriver) {
        availabeDriver.isAvailable = false;
        return availabeDriver;
    } else {
        return null;
    }
}

function completeRide(driver) { // complete ride function will release the driver and set his availibility true
    driver.isAvailable = true
}

function main() { // this is main function
    registerDriversAndRiders();
    const bookedDriver1 = bookRide(riders[0]); // book ride for user 1
    if (bookedDriver1) {
        console.log(" This driver is assigned to you =>", bookedDriver1);
    } else {
        console.log("No driver found near you");
    }

    const bookedDriver2 = bookRide(riders[1]); // book ride for user 2
    if (bookedDriver2) {
        console.log(" This driver is assigned to you =>", bookedDriver2);
    } else {
        console.log("No driver found near you");
    }

    if (bookedDriver1) { // complete ride for user 1
        completeRide(bookedDriver1);
    }
}

main();


