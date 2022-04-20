import { Breadcrumb, Carousel  } from "antd";

function App() {
  return (
    <>
      <Breadcrumb className="mx-4 my-4">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>

      <div className="bg-white pt-6" style={{ minHeight: 260 }}>
        <Carousel autoplay>
          <div>
            <img src="images/slider-1.png" alt="slider-1" />
          </div>
          <div>
            <img src="images/slider-2.png" alt="slider-2" />
          </div>
          <div>
            <img src="images/slider-3.png" alt="slider-3" />
          </div>
          <div>
            <img src="images/slider-4.png" alt="slider-4" />
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default App;
