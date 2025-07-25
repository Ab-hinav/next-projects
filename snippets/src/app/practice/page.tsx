import LoginForm from "@/components/LoginForm";
import OTPForm from "@/components/LoginForm2";


export default function SamplePage() {


    return <div className="bg-sky-900 absolute h-screen w-screen">

        <div className="flex mx-auto justify-center mt-15 flex-col text-white">
            <div className="font-bold  text-3xl mx-auto mb-15" ><span className="text-cyan-300" >Webinar</span>.gg</div>

            <LoginForm></LoginForm>
            <OTPForm></OTPForm>



        </div>


    </div>




}