import { Box, Tab, Tabs } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useState } from "react"
import styled from "styled-components"
import React from "react"

const StyledTabs = styled(Tabs)`
  && .Mui-selected {
    font-weight: 700;
    color: var(--primary999);
    border-bottom: 5px solid var(--primary500);
    border-radius: 5px 5px 0px 0px;
  }
  && .MuiTabs-indicator {
    visibility: hidden !important;
  }
  // margin-top: 2em;
`
const StyledBox = styled(Box)`
  border-top: 1px solid var(--neutral400);
  padding-right: 0px !important;
  padding-left: 0px !important;
`
const StyledTab = styled(Tab)`
  && {
    color: var(--neutral400);
    text-transform: none;
  }
`

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {<StyledBox p={3}>{children}</StyledBox>}
    </div>
  )
}

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  }
}
/**
 * @param {any} tabChildrens  - array of tab childrens
 * @param {any} endRender - function to render the last tab
 * */
const CustomTabs = ({
  tabChildrens = [],
  endRender = null,
}: {
  tabChildrens: { key: string; render: JSX.Element | null }[]
  endRender?: JSX.Element
}) => {
  const [currentTab, setCurrentTab] = useState(0)
  const theme = useTheme()
  return (
    <div>
      <StyledTabs
        value={currentTab}
        onChange={(_event, index) => setCurrentTab(index)}
        aria-label="tabs"
      >
        {tabChildrens.map((child, index) => (
          <StyledTab label={child.key} {...a11yProps(index)} key={child.key} />
        ))}
      </StyledTabs>
      {endRender}
      {tabChildrens.map((child, index) => (
        <TabPanel
          value={currentTab}
          index={index}
          dir={theme.direction}
          key={child.key}
        >
          {child.render}
        </TabPanel>
      ))}
    </div>
  )
}

export default CustomTabs
