import Layout from '@/components/Layout'
import Search from '@/components/Search'
import React from 'react'
import { useRouter } from "next/router"

const search = () => {
    const router = useRouter()
    const { query: { title } } = router
    return (
        <Layout>
            <Search title={title} />
        </Layout>
    )
}

export default search