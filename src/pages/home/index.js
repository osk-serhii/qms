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
            <img src="images/slider-1.png" />
          </div>
          <div>
            <img src="images/slider-2.png" />
          </div>
          <div>
            <img src="images/slider-3.png" />
          </div>
          <div>
            <img src="images/slider-4.png" />
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default App;
