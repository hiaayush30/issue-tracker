
"use client"
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Skeleton from "@/components/Skeleton"
import { toast } from 'react-toastify'


function AssignIssue({ issue }: { issue: Issue }) {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],   //for uniquely identifying a piece of data in the cache
        queryFn: () => axios.get("/api/users").then(res => res.data.users),
        // query fn returns a promise that will resolve to give our data
        staleTime: 60 * 1000, //60sec,
        retry: 3  // retry failed request 3 times
    });
    if (isLoading) return <Skeleton width={"13rem"} height={"1rem"} />
    if (error) return null;

    return (
        <Select.Root 
            defaultValue={issue.assignedToUserId || "null"}
            onValueChange={async (assignedToUserId) => {
                try {
                    if (assignedToUserId == "null") {
                        await axios.patch("/api/issues/" + issue.id, { assignedToUserId: null });
                        toast("issue unassigned");
                    }
                    else {
                        await axios.patch("/api/issues/" + issue.id, { assignedToUserId });
                        toast("issue assigned");
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("Something went wrong!");
                }
            }}>
            <Select.Trigger placeholder='Assign . . .' />
            <Select.Content>
                <Select.Group>
                    <Select.Item value={"null"}>unassigned</Select.Item>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map((user) => {
                        return <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    })}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssignIssue
