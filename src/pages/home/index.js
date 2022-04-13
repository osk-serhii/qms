import { Breadcrumb, Carousel  } from "antd";

function App() {
  const contentStyle = {
    height: '360px',
    color: '#fff',
    lineHeight: '360px',
    textAlign: 'center',
    background: '#364d79',
  };
  
  return (
    <>
      <Breadcrumb className="mx-4 my-4">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>

      <div className="bg-white p-6" style={{ minHeight: 360 }}>
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default App;
