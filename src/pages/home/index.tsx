import { Page } from "@/components/commom/Page"
import { StoresPartial } from "@/partials/StoresPartial"

const Home = () => {
    return (
        <Page title="Home" children={<StoresPartial />} />
    )
}

export default Home