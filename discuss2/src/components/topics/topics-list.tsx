import { prisma } from "@/db";
import paths from "@/path.helper";
import { Chip, Link } from "@heroui/react";


export default async function TopicList(){
    const topics = await prisma.topic.findMany();

    const renderedTopics = topics.map((topic) =>{
        return (<div key={topic.id} >
                <Link href={paths.topicShow(topic.slug)}>
                <Chip color="warning" >
                    {topic.slug}
                </Chip>
                </Link>
            </div>
        )
    })


    return <div className="flex flex-row flex-wrap gap-2">
        {renderedTopics}
    </div>

}