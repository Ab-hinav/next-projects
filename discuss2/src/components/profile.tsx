'use client'

import { useSession } from "next-auth/react"
import { Card, CardBody, Avatar } from "@heroui/react"

export default function Profile(){
    const session = useSession()

    if(session.data?.user){

        console.log(session.data?.user)


        return (
            <Card className="max-w-md w-full shadow-lg mt-6">
                <CardBody className="text-center">
                    <div className="flex flex-col items-center space-y-4">
                        <Avatar 
                            src={session.data.user.image || undefined}
                            name={session.data.user.name || "User"}
                            size="lg"
                            className="w-20 h-20"
                        />
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Welcome, {session.data.user.name}!
                            </h3>
                            <h2>userID {session.data.user.id}</h2>
                            <p className="text-gray-600 mt-1">
                                {session.data.user.email}
                            </p>
                            <div className="mt-2 text-xs text-gray-500">
                                ✅ Successfully signed in
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }

    return (
        <Card className="max-w-md w-full shadow-lg mt-6">
            <CardBody className="text-center">
                <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-600">Not signed in</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Please sign in to view your profile
                        </p>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}