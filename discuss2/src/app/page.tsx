
import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import * as actions from '@/actions';
import Profile from "@/components/profile";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topics-list";
import PostList from "@/components/posts/post-list";
import { fetchTopPosts } from "@/db/queries/posts";


export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4" >
      <div className="col-span-3" >
        <h1 className="text-xl m-2" >Top Posts</h1>
        <PostList fetchData={fetchTopPosts} ></PostList>
      </div>
      <div className="border shadow py-3 px-3 rounded-lg" >
        <TopicCreateForm></TopicCreateForm>
        <Divider className="my-2" ></Divider>
        <h3 className="text-lg" >My topics</h3>
        <TopicList></TopicList>
      </div>
    </div>
  );
}
