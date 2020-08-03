import React from "react"
import DuperLogo from "../../../assets/logo.svg"
import styled from "@emotion/styled"

const Wrapper = styled.div({
  display: "flex",
  alignItems: "center",
})

export default function Logo() {
  return (
    <Wrapper>
      <img width={250} src={DuperLogo} alt="Duper Logo" />
    </Wrapper>
  )
}
