import { useDeletePortfolio } from 'actions/portfolios'
import { useGetUser } from 'actions/user'
import BasePage from 'components/BasePage'
import BaseLayout from 'components/layouts/BaseLayout'
import PortfolioApi from 'lib/api/portfolios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { isAuthorized } from 'utils/auth0'
import PortfolioCard from '../../components/PortfolioCard'

const Portfolios = ({ portfolios: initialPortfolios }) => {
  const router = useRouter()
  const [portfolios, setPortfolios] = useState(initialPortfolios)
  const [deletePortfolio, { data, error }] = useDeletePortfolio()
  const { data: dataU, loading: loadingU } = useGetUser()

  const _deletePortfolio = async (e, portfolioId) => {
    e.stopPropagation()
    const isConfirm = confirm('Are you sure want to delete this portfolio?')
    if (isConfirm) {
      await deletePortfolio(portfolioId)
      setPortfolios(portfolios.filter((p) => p._id !== portfolioId))
    }
  }

  return (
    <BaseLayout user={dataU} loading={loadingU}>
      <BasePage
        className="portfolio-page"
        title="Portfolios"
        metaTitle="Portfolios - Raul Rosa"
      >
        <Row>
          {portfolios.map((portfolio) => (
            <Col
              key={portfolio._id}
              md="4"
              onClick={() => {
                router.push('/portfolios/[id]', `/portfolios/${portfolio._id}`)
              }}
            >
              <PortfolioCard portfolio={portfolio}>
                {dataU && isAuthorized(dataU, 'admin') && (
                  <>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(
                          '/portfolios/[id]/edit',
                          `/portfolios/${portfolio._id}/edit`
                        )
                      }}
                      className="mr-2"
                      color="warning"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={(e) => _deletePortfolio(e, portfolio._id)}
                      color="danger"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </PortfolioCard>
            </Col>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  )
}

// This function is called during the build time
// Improved performance of page
// It will create static page with dynamic data
export async function getStaticProps() {
  const json = await new PortfolioApi().getAll()
  const portfolios = json.data
  return {
    props: {
      portfolios
    },
    revalidate: 1
  }
}

export default Portfolios
