import React from 'react'
import { ICar } from './demo';

interface IProps {
    car: ICar;
}

export const CarItem: React.FC<IProps> = (props) => {
    return (
        <div>
            <h1>{props.car.color}</h1>
        </div>
    );
}

export default CarItem;