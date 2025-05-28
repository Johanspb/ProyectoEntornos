// src/pages/Home.js
import React from 'react';
import { Carousel } from 'react-bootstrap';


const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenido a la Aplicación de Inventario</h1>
      <p>Selecciona una opción en el menú para comenzar.</p>
       <div style={{ width: '30%', margin: '50px auto' }}>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={"https://th.bing.com/th/id/OIP.QdzAaT0R40wyfwkurv0MJwAAAA?w=197&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7"} alt="Primera imagen" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={"https://th.bing.com/th/id/OIP.h3VEiREOvhMaCGVb2o7XLgAAAA?w=197&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7"} alt="Segunda imagen" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={"https://th.bing.com/th/id/OIP._-TzGbedhU_6h_4ogev9PwAAAA?w=198&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7"} alt="Tercera imagen" />
        </Carousel.Item>
      </Carousel>
    </div>
    </div>

  );
};

export default Home;
