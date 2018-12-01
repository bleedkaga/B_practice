import _ from 'lodash';
import './style.css'
import car from './car.jpg'


function component(){
    var oDiv = document.createElement("div");

    oDiv.innerHTML = _.join(['hello', 'webpack'], '')

    oDiv.classList.add("red")

    var myCar = new Image();

    myCar.src = car;

    oDiv.appendChild(myCar)

    return oDiv;
}

document.body.appendChild(component())