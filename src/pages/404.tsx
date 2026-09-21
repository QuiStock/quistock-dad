import { Page } from '@/components/commom/Page'
import { Home } from '@mui/icons-material'
import { IconsComponent } from '@/components/commom/IconsComponent'
import { ButtonWithIcon } from '@/components/commom/ButtonWithIcon'

const NotFound = () => {

  return (
    <Page title="Quistock Admin">
      <IconsComponent type="OpsExclamation" size="big">
        <p>{"Página não encontrada..."}</p>
        <ButtonWithIcon
          variant="contained"
          icon={<Home />}
        // TODO: ver como faz sem next/router
        // onClick={() => router.push('/')}
        >
          {"Voltar"}
        </ButtonWithIcon>
      </IconsComponent>
    </Page>
  )
}

export default NotFound
