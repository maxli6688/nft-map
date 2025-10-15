import React, {
  useState,
  useRef,
  useCallback,
  ChangeEventHandler,
  useEffect,
} from "react";
import Cropper from "react-easy-crop";
import { Slider, Upload, Button } from "antd";
import type { SliderSingleProps } from "antd";
import "./index.less";
import { createImage } from "@/utils";

export type ImageCroped = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type ImageCropProps = {
  onCancel: () => void;
  onOk: () => void;
  onlandImageChange: (x: string) => void;
};
const cropHeight = 500;
const ImageCrop: React.FC<ImageCropProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cropperRef = useRef<Cropper>(null);
  let [srcImg, setSrcImg] = useState<string>("https://via.placeholder.com/300");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [gridw, setGridw] = useState<number>(1);
  const [gridh, setGridh] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [stylew, setStylew] = useState<number>(cropHeight);
  const [styleh, setStyleh] = useState<number>(cropHeight);
  const [activePart, setActivePart] = useState<number>(1);
  useEffect(() => {
    setTotal(gridw * gridh);
  }, [gridw, gridh]);
  useEffect(() => {
    getCroppedImg(srcImg);
  }, [gridw, gridh, activePart]);
  const getNewCrop = (
    cropped: ImageCroped,
    xx: number,
    yy: number,
    n: number = 1
  ): ImageCroped => {
    let tx = cropped.x;
    let ty = cropped.y;
    let twidth = cropped.width;
    let theight = cropped.height;
    if (xx > 1 || yy > 1) {
      twidth = cropped.width / xx;
      theight = cropped.height / yy;
      const newx = n % xx === 0 ? xx - 1 : (n % xx) - 1;
      const newy = Math.ceil(n / xx) - 1;
      tx = tx + newx * twidth;
      ty = ty + newy * theight;
      console.log(cropped, tx, ty, newx, newy, 555666);
      return {
        x: tx,
        y: ty,
        width: twidth,
        height: theight,
      };
    }
    return cropped;
  };
  const getCroppedImg = async (srcImg: string | undefined) => {
    try {
      // const canvas = document.createElement('canvas');
      const canvas = canvasRef.current;
      let cropped: ImageCroped | undefined;
      if (cropperRef.current) {
        const data = cropperRef.current.getCropData();
        cropped = data?.croppedAreaPixels;
      }
      if (cropped && canvas && srcImg) {
        canvas.width = 160;
        canvas.height = 160;
        const ctx = canvas.getContext("2d");
        console.log(cropped, 11232234);
        const image = (await createImage(
          srcImg
        )) as unknown as HTMLImageElement;
        const newCrop = getNewCrop(cropped, gridw, gridh, activePart);
        // console.log(cropped, newCrop, 5555);
        ctx?.drawImage(
          image,
          newCrop.x,
          newCrop.y,
          newCrop.width,
          newCrop.height,
          0,
          0,
          160,
          160
        );
        const base64Image = canvas.toDataURL("image/png", 1);
        props.onlandImageChange(base64Image);
      }
    } catch (e) {
      console.log("crop the image");
    }
  };
  const choosePart = useCallback((index: number) => {
    setActivePart(index);
  }, []);
  const onCropComplete = useCallback(
    (croppedArea: ImageCroped, croppedAreaPixels: ImageCroped) => {
      console.log(croppedArea, croppedAreaPixels);
      getCroppedImg(srcImg);
    },
    [srcImg]
  );
  const onMediaLoaded = useCallback(() => {
    console.log(22222222222);
    getCroppedImg(srcImg);
  }, [srcImg]);
  const onSliderChange: SliderSingleProps["onChange"] = (e) => {
    console.log(e);
    setZoom(e);
    // update
  };
  function updateWh() {
    let maingrid = document
      .querySelector(".reactEasyCrop_CropAreaGrid")
      ?.getBoundingClientRect();
    if (maingrid?.width) {
      setStylew(maingrid.width);
      setStyleh(maingrid.height);
    }
  }
  const onSliderwChange: SliderSingleProps["onChange"] = (e) => {
    console.log(e);
    setGridw(e);
    setTimeout(() => {
      updateWh();
    });
  };
  const onSliderhChange: SliderSingleProps["onChange"] = (e) => {
    console.log(e);
    setGridh(e);
    setTimeout(() => {
      updateWh();
    });
  };
  // const [image, setImage] = useState(null);
  const handleImage: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files?.[0]) {
      let src = URL.createObjectURL(event.target.files[0]);
      if (src) {
        setSrcImg(src!);
      }
    }
  };

  return (
    <div className="imgcropbox-container">
      <div className="cropcontroller">
        <div className="crop-row">
          <div className="row w50">
            <span className="title">width grids:</span>
            <span className="sval">{gridw}</span>
            <Slider
              className="sliders"
              value={gridw}
              min={1}
              max={10}
              step={1}
              onChange={onSliderwChange}
            />
          </div>
          <div className="row w50">
            <span className="title">height grids:</span>
            <span className="sval">{gridh}</span>
            <Slider
              className="sliders"
              value={gridh}
              min={1}
              max={10}
              step={1}
              onChange={onSliderhChange}
            />
          </div>
        </div>
      </div>
      <div className="imgcropbox">
        <div className="crop-container">
          <Cropper
            image={srcImg}
            crop={crop}
            zoom={zoom}
            aspect={gridw / gridh}
            ref={cropperRef}
            objectFit={"vertical-cover"}
            onCropChange={setCrop}
            onMediaLoaded={onMediaLoaded}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div
            className={`cropgrid col${gridw} row${gridh}`}
            style={{ width: `${stylew}px`, height: `${styleh}px` }}
          >
            {Array(total)
              .fill(1)
              .map((item, index) => (
                <div
                  key={index}
                  className={`grid-item ${
                    activePart === index + 1 ? "active" : ""
                  }`}
                >
                  {index + 1}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="setlect">Choose cropped part:</div>
      <div className="controls">
        {Array(total)
          .fill(1)
          .map((item, index) => (
            <Button
              key={index}
              className={`grid-item ${
                activePart === index + 1 ? "active" : ""
              }`}
              onClick={() => {
                choosePart(index + 1);
              }}
            >
              {index + 1}
            </Button>
          ))}
        <div className="canvaspreview">
          <canvas ref={canvasRef} width={160} height={160}></canvas>
        </div>
      </div>
      <div className="footer">
        <Button className="inputfile">
          Select File
          <input
            type="file"
            className="input"
            accept="image/*"
            onChange={handleImage}
          />
        </Button>
        <div className="row w50">
          <span className="title">image scale:</span>
          <span className="sval">{zoom}</span>
          <Slider
            className="sliders"
            value={zoom}
            min={0.5}
            max={3}
            step={0.1}
            onChange={onSliderChange}
          />
        </div>
        <div className="btn-group">
          <Button className="mbtn mr-8" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button className="mbtn" type="primary" onClick={props.onOk}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ImageCrop;
