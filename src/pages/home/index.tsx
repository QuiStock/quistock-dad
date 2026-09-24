import { Page } from "@/components/commom/Page"
import { StoresPartial } from "@/partials/StoresPartial"
import ReducedDashboard from "@/components/home/ReducedDashboard"

const Home = () => {
    return (
        <Page title="Home" children={<>
            <ReducedDashboard />
            <StoresPartial />
        </>} />
    )
}

export default Home