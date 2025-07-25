import Card from "@/components/Card";
import Calender from "@/components/Calender";
import Image from "next/image";
import img from "/public/car.jpg";
import vercel from "/public/bgimg.jpg";
import SideBar from "@/components/Slider";

export default function SamplePage() {





    return <SideBar><div className="w-screen" >
        <Image className="w-full h-32 object-cover bg-fixed top-0 right-0 z-10"
            src={vercel}
            
            alt="Picture of the author"
        />
        <Card imageSrc={img} title={"Prableen Kaur"} phone={"9923432494"} email="prableenKaur213@gmail.com" location={"Delhi"} ></Card>
        <Calender date={new Date()} ></Calender>
    </div>
    </SideBar>



}