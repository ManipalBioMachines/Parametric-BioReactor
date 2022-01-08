import React, { ReactElement, useState } from "react";
import cn from "classnames";
import Input from "./components/Input";
import useInputState from "./hooks/useInputState";
//@ts-ignore
import STLViewer from "stl-viewer";
import axios from "axios";
import Loading from "./components/Loading";
import logo from "./assets/bread.png";
import background from "./assets/background.jpg";

export default function App(): ReactElement {
  const [basicSelected, setBasicSelected] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useState<any>(null);

  const startLoading = () => setLoading(true);
  const endLoading = () => setLoading(false);

  const setURLs = (data: any) => setData(data);

  if (!!data) {
    return <Result data={data} />;
  }

  // className: PropTypes.string,
  //   url: PropTypes.string,
  //   width: PropTypes.number,
  //   height: PropTypes.number,
  //   backgroundColor: PropTypes.string,
  //   modelColor: PropTypes.string,
  //   rotate: PropTypes.bool,
  //   orbitControls: PropTypes.bool,
  //   cameraX: PropTypes.number,
  //   cameraY: PropTypes.number,
  //   cameraZ: PropTypes.number,
  //   lights: PropTypes.array,
  //   lightColor: PropTypes.string,
  //   rotationSpeeds: PropTypes.arrayOf(PropTypes.number),
  //   model: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.instanceOf(ArrayBuffer)
  //   ]).isRequired
  // };

  if (loading) {
    return (
      <div className="screen-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="app">
        <img src={background} alt="" className="bg" />
        <h1>
          {" "}
          <img src={logo} className="logo" alt="BREAD" /> BioREActorDesigner
          (BREAD)
        </h1>
        <div className="switch">
          <span
            className={cn({ active: basicSelected })}
            onClick={() => setBasicSelected(true)}
          >
            Basic
          </span>
          <span
            className={cn({ active: !basicSelected })}
            onClick={() => setBasicSelected(false)}
          >
            Advanced
          </span>
        </div>
        <main>
          {basicSelected ? (
            <Basic
              startLoading={startLoading}
              endLoading={endLoading}
              setURLs={setURLs}
            />
          ) : (
            <Advanced
              startLoading={startLoading}
              endLoading={endLoading}
              setURLs={setURLs}
            />
          )}
        </main>
        <div className={basicSelected ? "bottom bottom-basic" : "bottom"}>
          Give us feedback{" "}
          <a href="https://forms.gle/suVr6dtJ3xkXKJkp7">here</a>
        </div>
      </div>
    </>
  );
}

function Basic({ startLoading, endLoading, setURLs }: any): ReactElement {
  const Volume = useInputState();
  const H_D = useInputState();

  const generateBasicModel = async () => {
    startLoading();

    try {
      const res = await axios.post(`http://64.227.177.61:8000/basic`, {
        volume: Volume.value.toString(),
        h_d: H_D.value.toString(),
      });
      setURLs(res.data.files);
      endLoading();
    } catch (err) {
      endLoading();
    }
  };

  // TotalVolume = int(10/8*Volume)*pow(10,6)
  //   Diameter=pow(24*TotalVolume/(5*math.pi),1/3)
  //   Height = Diameter*H_D

  return (
    <div className="basic">
      <h2>Basic</h2>
      <Input state={Volume} title="Volume (Litres)" />
      <Input state={H_D} title="Height / Diameter Ratio" />
      <div onClick={generateBasicModel} className="btn">
        Generate
      </div>
    </div>
  );
}

function Advanced({ startLoading, endLoading, setURLs }: any): ReactElement {
  const Volume = useInputState();
  const H_D = useInputState();
  const BaffleLen = useInputState();
  const BaffleWid = useInputState();
  const Thickness = useInputState();
  const BaseThickness = useInputState();
  const ShaftDiameter = useInputState();
  const Baffle_count = useInputState();
  const Hub_Diameter = useInputState();
  const Hub_Height = useInputState();
  const Blade_Length = useInputState();
  const Blade_Angle = useInputState();
  const Blade_Thickness = useInputState();
  const Blade_Count = useInputState();
  const Num_Imp = useInputState();

  const generateAdvancedModel = async () => {
    startLoading();
    try {
      const res = await axios.post(`http://64.227.177.61:8000/advanced`, {
        volume: Volume.value,
        h_d: H_D.value,
        baffleLen: BaffleLen.value,
        baffleWid: BaffleWid.value,
        thickness: Thickness.value,
        baseThickness: BaseThickness.value,
        shaftDiameter: ShaftDiameter.value,
        baffle_count: Baffle_count.value,
        hub_diameter: Hub_Diameter.value,
        hub_height: Hub_Height.value,
        blade_length: Blade_Length.value,
        blade_angle: Blade_Angle.value,
        blade_thickness: Blade_Thickness.value,
        blade_count: Blade_Count.value,
        mum_imp: Num_Imp.value,
      });
      setURLs(res.data.files);
      endLoading();
    } catch (err) {
      endLoading();
    }
  };

  return (
    <div className="advanced">
      <h2>Advanced</h2>
      <div className="flex">
        <Input state={Volume} title="Volume (Litres)" />
        <Input state={H_D} title="Height / Diameter Ratio" />
      </div>
      <div className="flex">
        <Input state={BaffleLen} title="Baffle Length (cm)" />
        <Input state={BaffleWid} title="Baffle Width (cm)" />
        <Input state={Baffle_count} title="Baffle Count" />
      </div>
      <div className="flex">
        <Input state={Thickness} title="Thickness (cm)" />
        <Input state={BaseThickness} title="Base Thickness (cm)" />
        <Input state={ShaftDiameter} title="Shaft Diameter (cm)" />
      </div>
      <div className="flex">
        <Input state={Hub_Diameter} title="Hub Diameter (cm)" />
        <Input state={Hub_Height} title="Hub Height (cm)" />
      </div>
      <section>
        <h3>Type of Impeller</h3>
        <label htmlFor="pitch">
          {" "}
          <input id="pitch" type="checkbox" />
          <span>Pitch Blade</span>
        </label>

        <label htmlFor="rushton">
          {" "}
          <input id="rushton" type="checkbox" />
          <span>Rushton Blade</span>
        </label>
      </section>
      <Input state={Num_Imp} title="Number of Impellers" />
      <div className="flex">
        <Input state={Blade_Length} title="Blade Length (cm)" />
        <Input state={Blade_Angle} title="Blade Angle (deg)" />
        <Input state={Blade_Thickness} title="Blade Thickness (cm)" />
        <Input state={Blade_Count} title="Blade Count" />
      </div>
      <div onClick={generateAdvancedModel} className="btn">
        Generate
      </div>
    </div>
  );
}

function Result({ data }: any): ReactElement {
  return (
    <div className="result">
      <div className="buttons">
        <a href={"http://64.227.177.61/"} className="download">
          Go back
        </a>
        <a
          href={"http://64.227.177.61:8000/" + data[0]}
          download
          className="download"
        >
          Download STL
        </a>
        <a
          href={"http://64.227.177.61:8000/" + data[1]}
          download
          className="download"
        >
          Download Step
        </a>
      </div>
      <div className="viewer">
        <STLViewer
          width={500}
          height={500}
          modelColor="#ff0000"
          backgroundColor="#BDD5CB"
          rotate={true}
          orbitControls={true}
          model={"http://64.227.177.61:8000/" + data[0]}
        />
      </div>
      <h3>Hold cursor to move!</h3>
    </div>
  );
}
