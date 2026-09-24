import { Page } from '@/components/commom/Page'
import { Home } from '@mui/icons-material'
import { IconsComponent } from '@/components/commom/IconsComponent'
import { ButtonWithIcon } from '@/components/commom/ButtonWithIcon'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Page title="QuiStock Admin">
      <IconsComponent type="OpsExclamation" size="big">
        <p>{'Página não encontrada...'}</p>
        <ButtonWithIcon
          variant="contained"
          icon={<Home />}
          onClick={() => {
            void navigate('/')
          }}
        >
          {'Voltar'}
        </ButtonWithIcon>
      </IconsComponent>
    </Page>
  )
}

export default NotFound
