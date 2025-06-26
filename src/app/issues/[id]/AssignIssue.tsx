
"use client"
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


function AssignIssue() {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await axios.get<{users:User[]}>("/api/users");
                setUsers(allUsers.data.users);
            } catch (error) {
                console.log(error);
                if (error instanceof AxiosError) {
                    toast(error.response?.data?.error)
                }
            }
        }
        fetchUsers();
    }, [])
    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign . . .' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users.map((user) => {
                        return <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    })}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssignIssue
