import { graphql } from "gatsby"
import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = ({ data }) => {
  const { allWpPost, allWpMenu, wpPage } = data
  const cases = allWpPost.nodes
  const menu = allWpMenu.nodes[0].cases_accordian.menuItem
  console.log("wpPage", wpPage)
  const { title: pageTitle, taglineField } = wpPage.casePage

  const [activeLink, setActiveLink] = React.useState("")
  const [activeCaseData, setActiveCaseData] = React.useState(cases[0])
  const [menudata, setMenudata] = React.useState(menu)
  const [isDesktop, setDesktop] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setDesktop(window.innerWidth > 768)
    }
  }, [])

  React.useEffect(() => {
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  })

  React.useEffect(() => {
    if (activeLink) {
      console.log("activeLink", activeLink)
      const getActiveData = cases.find(item => {
        console.log("item.custom_case.slug", item.custom_case.slug)
        return item.custom_case.slug === activeLink
      })
      console.log("getActiveData", getActiveData)
      setActiveCaseData(getActiveData)
    }
  }, [activeLink, cases])

  React.useEffect(() => {
    setActiveLink(menu[0].slug)
  }, [])

  const updateMedia = () => {
    const isDesktop = window.innerWidth > 768
    setDesktop(isDesktop)
    if (!isDesktop) {
      setActiveLink(null)
    }
  }

  const { title, tagline, description, image, ctaButtons } =
    activeCaseData.custom_case

  return (
    <Layout>
      <main className="container mx-auto flex justify-center md:items-center flex-col gap-12 lg:py-12 py-6">
        <div className="h-full">
          <h1 className="uppercase max-md:text-5xl text-7xl text-center font-bold mb-4 tracking-wide">
            {pageTitle}
          </h1>
          <div className="flex gap-4 justify-center items-center">
            <span className="max-md:hidden">
              <img
                id={taglineField.icon.id}
                src={taglineField.icon.sourceUrl}
                alt={taglineField.icon.altText}
                srcset={taglineField.icon.srcSet}
                width={24}
              />
            </span>
            <h5 className="tracking-wider font-semibold">
              {taglineField.tagline}
            </h5>
          </div>
        </div>
        <section className="min-w-[1000px] flex max-lg:hidden">
          <div className="w-[35%] p-2 bg-navyblue-light">
            <ul className="group">
              {menudata.map(menu => {
                return (
                  <li
                    key={menu.slug}
                    className={`${
                      activeLink === menu.slug ? "bg-navyblue-dark/20" : ""
                    } cursor-pointer transition-all`}
                    onClick={() => setActiveLink(menu.slug)}
                  >
                    <div className="flex gap-4 items-center mx-5 border-b border-[#85B5C7] py-4 text-white font-semibold tracking-wide">
                      <span>
                        <img
                          id={image.id}
                          src={menu.icon.sourceUrl}
                          alt={menu.icon.altText}
                          srcset={menu.icon.srcSet}
                          width={20}
                        />
                      </span>
                      <p>{menu.title}</p>
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
                  id={image.id}
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
          <div className=" bg-navyblue-light w-full">
            {cases.map(item => {
              return (
                <>
                  <div
                    className={`item ${
                      activeLink === item.custom_case.slug ? "active" : ""
                    }`}
                  >
                    <div
                      key={item.custom_case.title.text}
                      className={`${
                        activeLink === item.custom_case.slug
                          ? "bg-navyblue-dark/20"
                          : ""
                      } cursor-pointer transition-all`}
                      onClick={() => {
                        setActiveLink(
                          activeLink === item.custom_case.slug
                            ? null
                            : item.custom_case.slug
                        )
                      }}
                    >
                      <div className="title flex gap-4 justify-between items-center px-5 border-b border-[#85B5C7] py-4 text-white font-semibold tracking-wide">
                        <p>{item.custom_case.title}</p>
                        <span className="flex w-6 h-6 justify-center items-center border rounded-full">
                          {item.custom_case.title === activeLink ? "-" : "+"}
                        </span>
                      </div>
                    </div>
                    <div className="content">
                      <div className="bg-gray-dark/90 text-white relative overflow-x-hidden py-9">
                        <div className="text-center mb-7 p-4">
                          <h2 className="text-xl mb-2">{title}</h2>
                          <p className="uppercase tracking-wide text-sm">
                            {tagline}
                          </p>
                        </div>
                        <div className="relative mb-6 ">
                          <div
                            className="float-right -mr-8 mb-2 -mt-4"
                            style={{
                              shapeOutside: "circle(50%)",
                            }}
                          >
                            <img
                              id={image.id}
                              src={image.sourceUrl}
                              alt={image.altText}
                              srcset={image.srcSet}
                              width={180}
                            />
                          </div>
                          <p className="max-w-[400px] text-sm px-4">
                            {description}
                          </p>
                        </div>
                        <div className="flex justify-center items-center gap-3 p-4">
                          <button className="py-2 w-[164px] text-sm rounded-full border-2">
                            {ctaButtons[0].catButton}
                          </button>
                          <button className="py-2 w-[160px] text-sm rounded-full border-2 border-red-dark bg-red-dark hover:bg-red-dark/80">
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
          slug
          title
          tagline
          description
          image {
            id
            altText
            sourceUrl
            srcSet
          }
          ctaButtons {
            catButton
          }
        }
      }
    }

    allWpMenu {
      nodes {
        cases_accordian {
          menuItem {
            title
            icon {
              id
              altText
              sourceUrl
              srcSet
            }
            slug
          }
        }
      }
    }

    wpPage {
      casePage {
        title
        taglineField {
          tagline
          icon {
            altText
            sourceUrl
            srcSet
            id
          }
        }
      }
    }
  }
`

export const Head = () => <Seo title="Home" />

export default IndexPage
