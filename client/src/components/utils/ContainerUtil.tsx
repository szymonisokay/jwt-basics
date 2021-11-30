import Container from "@mui/material/Container"

type PropsType = {
  children: React.ReactNode
}

const ContainerUtil: React.FC<PropsType> = ({ children }) => (
  <Container maxWidth="lg" style={{ height: "100%" }}>
    {children}
  </Container>
)

export default ContainerUtil
