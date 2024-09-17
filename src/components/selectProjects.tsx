
'use client'
import { Client, Project, User } from "@prisma/client";
import { Select, SelectTrigger,SelectContent,SelectGroup,SelectItem } from "./ui/select";
import { Building2, FolderOpenDot } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useOptimistic } from "react";
import { onCreateClient, onCreateProject } from "@/app/actions";


export default  function SelectProjects({projects,userId}:{projects:Project[],userId:string }) {

   
  const [optimisticProjects, addOptimisticProject] = useOptimistic(
    projects,
    (state:Project[], newProject:any) => {
        return [...state, newProject];
      }
    ) 
    // useEffect(() => {console.log(optimisticProjects)},[optimisticProjects])
  return (
    <Select name="project">
      <SelectTrigger className=" flex items-center gap-5 justify-around w-fit min-w-16 max-w-24   md:py-4">
        <FolderOpenDot size={32} />
      </SelectTrigger>
      <SelectContent>
          {/* <form 
          action={async (data:FormData)  => {
            const userId = data.get('userId') as string
            const name = data.get('name') as string
            addOptimisticProject({
              id: Math.random(),
              name,
            })
            
            await onCreateProject(userId,name)

          }}>
            <Input type="hidden" name="userId" defaultValue={userId } />
            <Input placeholder="Add a client" name="name" type="text" />
          </form> */}
          <SelectItem value="null">None</SelectItem>
          {optimisticProjects.map((project: Project) => (
            <SelectItem value={project.id} key={project.id}>
              {project.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}