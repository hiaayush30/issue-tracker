"use client"

//insted of just loading SimpleMDE dynamically (it appears after page is loaded which doest look good)
// so load whole page dynamically so they all load together
import dynamic from 'next/dynamic'
import IssueFormSkeleton from '../_components/IssueFormSkeleton'
const IssueForm = dynamic(() => import('../_components/IssueForm'), {
    ssr: false,
    loading: () => <IssueFormSkeleton/>
})

function page() {
    return (
        <IssueForm />
    )
}

export default page
