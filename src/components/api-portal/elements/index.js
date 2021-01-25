import React from "react"
import styled from "styled-components"
import { CenteredContent } from "../../general/Layout"
import { Icon, Typography } from "antd"
import Autofill from "./autofill"
import PropsList from "../PropsList"

const { Paragraph, Title } = Typography

const Section = styled.div`
  margin-bottom: 5em;
  h1,
  h2,
  h3,
  h4 {
    color: rgba(0, 0, 0, 0.65) !important;
  }
  h1 {
    font-weight: 350 !important;
    letter-spacing: 0.05em !important;
  }
  h4 {
    font-size: 1em !important;
  }
`

const SectionText = styled.div`
  font-size: 1.3em;
  margin: 1.5em 0;
`

const RegulatorCheckboxes = () => {
  return (
    <div>
      <div>
        An object to specify which regulator checkboxes to render. Specify{" "}
        <code>null</code> to remove all checkboxes.
      </div>
      <PropsList
        dataSource={[
          {
            name: "GB-COH",
            type: "boolean",
            description: "Initial state of the Companies House checkbox",
          },
          {
            name: "GB-SC",
            type: "boolean",
            description: "Initial state of the OSCR checkbox",
          },
          {
            name: "GB-NIC",
            type: "boolean",
            description: "Initial state of the CC NI checkbox",
          },
          {
            name: "GB-CHC",
            type: "boolean",
            description: "Initial state of the CC E&W checkbox",
          },
        ]}
      />
    </div>
  )
}

const RenderFields = () => {
  return (
    <div>
      <div>
        An object to specify which fields to render. Specify <code>null</code>{" "}
        to use your existing fields instead.
      </div>
      <PropsList
        dataSource={[
          {
            name: "name",
            type: "object",
            description: "Registered name",
          },
          {
            name: "website",
            type: "object",
            description: "Website",
          },
          {
            name: "contact",
            type: "object",
            description: "Address, email and phone number",
          },
          {
            name: "social",
            type: "object",
            description: "Facebook and Twitter handles",
          },
          {
            name: "activities",
            type: "object",
            description:
              "General description of the organisation's aims and activities",
          },
          {
            name: "registrationDate",
            type: "object",
            description: "Date last registered with the regulator",
          },
          {
            name: "numPeople",
            type: "object",
            description: "Number of trustees, employees and volunteers",
          },
          {
            name: "finances",
            type: "object",
            description: "Latest income and expenditure",
          },
        ]}
      />
    </div>
  )
}

const Elements = () => {
  return (
    <div style={{ padding: "2em" }}>
      <CenteredContent>
        <Section>
          <Title>
            <Icon type="build" style={{ marginRight: "0.5em" }} />
            CharityBase Elements
          </Title>
          <SectionText>
            <Paragraph>
              CharityBase Elements is a set of drop-in UI components that
              utilise the API for common use cases. Each element is completely
              customisable, responsive to different screen sizes and can be
              styled to match the look and feel of your site.
            </Paragraph>
          </SectionText>
        </Section>
        <Section>
          <Title level={3}>Autofilling Forms</Title>
          <SectionText>
            <Paragraph>
              If you accept applications / sign-ups from non-profits, you'll
              probably want to know some information about the organistaions
              that sign up. As an applicant it can be tedious filling in forms
              with the same information over and over. And as an application
              reviewer it's equally tiresome to have to validate the information
              received against other data sources.
            </Paragraph>
            <Paragraph>
              The CharityBase Autofill Element is designed to be inserted into
              your existing application form, and will automatically fill the
              first fields whilst the applicant is typing. Autofill features:
              <ul>
                <li>
                  Fetching verified data from the charity regulator so you don't
                  have to
                </li>
                <li>
                  Responsive design to fit the width of your applicants's screen
                </li>
                <li>
                  Customising the styling to match the look and feel of your
                  application flow
                </li>
              </ul>
            </Paragraph>
            <Autofill />
          </SectionText>
          <SectionText>
            <Title level={4}>
              <code>
                elements.createAutofill(
                <span style={{ color: "#EC407A" }}>[options]</span>)
              </code>
            </Title>
            <div>
              <PropsList
                dataSource={[
                  {
                    name: "buttonProps",
                    type: "object",
                    description:
                      "Attributes to be applied to the button element (keys should be camelCase)",
                  },
                  {
                    name: "className",
                    type: "string",
                    description: "Class to apply to the autofill element",
                  },
                  {
                    name: "gqlFields",
                    type: "string",
                    description:
                      "Contents of the CHC.getCharities.list GraphQL query",
                  },
                  {
                    name: "onButtonClick",
                    type: "function",
                    description:
                      "Callback fired when user clicks on the button",
                  },
                  {
                    name: "onChange",
                    type: "function",
                    description:
                      "Callback fired when user selects their organisation from the dropdown",
                  },
                  {
                    name: "outlined",
                    type: "boolean",
                    description:
                      "Whether or not to outline the text fields (true by default)",
                  },
                  {
                    name: "regulatorCheckboxes",
                    type: "object",
                    description: <RegulatorCheckboxes />,
                  },
                  {
                    name: "renderFields",
                    type: "object",
                    description: <RenderFields />,
                  },
                  {
                    name: "style",
                    type: "object",
                    description:
                      "Style object to apply to the autofill element (keys should be camelCase)",
                  },
                ]}
              />
            </div>
          </SectionText>
        </Section>
      </CenteredContent>
    </div>
  )
}

export default Elements
