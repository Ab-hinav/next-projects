import PostList from "@/components/posts/post-list";
import PostCreateForm from "@/components/posts/posts-create-form";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";

interface TopicsShowPageProps {
    params: Promise<{
        slug: string;
    }>
}



export default async function Page({params}:TopicsShowPageProps){

    const {slug} = await params;

    return <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3" >
            <h1 className="text-2xl font-bold mb-2" >
                {slug}
            </h1>
            <PostList fetchData={() => fetchPostsByTopicSlug(slug)}/>
        </div>
        <div>
            <PostCreateForm topicSlug={slug}></PostCreateForm>
        </div>
    </div>
}