import { graphql } from "gatsby"
import * as React from "react"

import Work from "../svgs/work.svg"

import Layout from "../components/layout"
import Seo from "../components/seo"

// import * as styles from "../components/index.module.css"

const IndexPage = ({ data }) => {
  const cases = data.allWpPost.nodes
  const [activeLink, setActiveLink] = React.useState("CAR ACCIDENTS")
  const [activeCaseData, setActiveCaseData] = React.useState(cases[0])
  const [menudata, setMenudata] = React.useState([])

  React.useEffect(() => {
    const data = cases.map(item => item.custom_case.title)
    setMenudata(data)
  }, [cases])

  React.useEffect(() => {
    if (activeLink) {
      console.log("activeLink", activeLink)
      const getActiveData = cases.find(
        item => item.custom_case.title === activeLink
      )
      setActiveCaseData(getActiveData)
    }
  }, [activeLink, cases])

  const { title, tagline, description, image, ctaButtons } =
    activeCaseData.custom_case

  return (
    <Layout>
      <main className="container mx-auto min-h-screen flex justify-center md:items-center flex-col gap-12 max-md:px-4">
        <div className="h-full">
          <h1 className="uppercase max-md:text-5xl text-7xl text-center font-bold mb-4 tracking-wide">
            Cases
          </h1>
          <div className="flex gap-4 justify-center items-center">
            <span className="max-md:hidden">
              <Work className="text-xs h-6" />
            </span>
            <h5 className="tracking-wider font-semibold">THAT WE HANDLE</h5>
          </div>
        </div>
        <section className="min-w-[1000px] flex max-lg:hidden">
          <div className="w-[35%] p-2 bg-navyblue-light">
            <ul className="group">
              {menudata.map(link => {
                return (
                  <li
                    key={link.text}
                    className={`${
                      activeLink === link ? "bg-navyblue-dark/20" : ""
                    } cursor-pointer transition-all`}
                    onClick={() => setActiveLink(link)}
                  >
                    <div className="flex gap-4 items-center mx-5 border-b border-[#85B5C7] py-4 text-white font-semibold tracking-wide">
                      <span>
                        <Work className="text-xs h-4" />
                      </span>
                      <p>{link}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="bg-gray-dark/90 w-[65%] text-white p-11 relative">
            <div className="text-center mb-10">
              <h2 className="text-3xl mb-2">{title}</h2>
              <p className="uppercase tracking-wide">{tagline}</p>
            </div>
            <div className="relative pb-6 mb-6 after:content-[''] after:absolute after:block after:w-80 after:h-1 after:bg-white after:bottom-0 after:left-1/2 after:-translate-x-1/2">
              <p className="max-w-[400px]">{description}</p>
              <div className="absolute right-0 top-[55%] -translate-y-1/2 translate-x-24">
                <img
                  src={image.sourceUrl}
                  alt={image.altText}
                  srcset={image.srcSet}
                  width={250}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <button className="py-3 min-w-[234px] rounded-full border-2">
                {ctaButtons[0].catButton}
              </button>
              <button className="py-3 min-w-[234px] rounded-full border-2 border-red-dark bg-red-dark hover:bg-red-dark/80">
                {ctaButtons[1].catButton}
              </button>
            </div>
          </div>
        </section>
        <section className="lg:hidden">
          <div className="p-2 bg-navyblue-light w-full">
            {cases.map(item => {
              return (
                <>
                  <div
                    className={`item ${
                      activeLink === item.custom_case.title ? "active" : ""
                    }`}
                  >
                    <div
                      key={item.custom_case.title.text}
                      className={`${
                        activeLink === item.custom_case.title
                          ? "bg-navyblue-dark/20"
                          : ""
                      } cursor-pointer transition-all`}
                      onClick={() => {
                        setActiveLink(
                          activeLink === item.custom_case.title
                            ? null
                            : item.custom_case.title
                        )
                      }}
                    >
                      <div className="title flex gap-4 justify-between items-center mx-5 border-b border-[#85B5C7] py-4 text-white font-semibold tracking-wide">
                        <p>{item.custom_case.title}</p>
                        <span className="flex w-6 h-6 justify-center items-center border rounded-full">
                          {item.custom_case.title === activeLink ? "+" : "-"}
                        </span>
                      </div>
                    </div>
                    <div className="content">
                      <div className="bg-gray-dark/90 text-white p-4 relative">
                        <div className="text-center mb-10">
                          <h2 className="text-xl mb-2">{title}</h2>
                          <p className="uppercase tracking-wide text-sm">
                            {tagline}
                          </p>
                        </div>
                        <div className="relative mb-6 ">
                          <div
                            className="float-right mx-4 my-2"
                            style={{
                              shapeOutside: "circle(50%)",
                            }}
                          >
                            <img
                              src={image.sourceUrl}
                              alt={image.altText}
                              srcset={image.srcSet}
                              width={180}
                            />
                          </div>
                          <p className="max-w-[400px] text-sm">{description}</p>
                        </div>
                        <div className="flex justify-center items-center gap-3">
                          <button className="py-2 min-w-[160px] text-sm rounded-full border-2">
                            {ctaButtons[0].catButton}
                          </button>
                          <button className="py-2 min-w-[160px] text-sm rounded-full border-2 border-red-dark bg-red-dark hover:bg-red-dark/80">
                            {ctaButtons[1].catButton}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allWpPost {
      nodes {
        custom_case {
          title
          tagline
          description
          image {
            id
            altText
            sourceUrl
            caption
            srcSet
            localFile {
              childImageSharp {
                original {
                  src
                }
                gatsbyImageData
                id
              }
            }
          }
          ctaButtons {
            catButton
          }
        }
      }
    }
  }
`

export const Head = () => <Seo title="Home" />

export default IndexPage
