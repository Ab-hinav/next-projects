import SnippitEditForm from "@/components/SnipetEditForm";
import { db } from "@/db";

interface ParamProp {
    params: {
        Id: string
    }
}


export default async function EditPage(params: Promise<ParamProp>) {

    const val = await params;

    const snippet = await db.snippet.findFirst({
        where: { id: parseInt(val.params.Id) },
    });


    return <div>
        <SnippitEditForm snippet={snippet} ></SnippitEditForm>
    </div>



}