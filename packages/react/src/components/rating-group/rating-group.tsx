"use client"

import type { Assign } from "@ark-ui/react"
import {
  RatingGroup as ArkRatingGroup,
  useRatingGroupContext,
  useRatingGroupItemContext,
} from "@ark-ui/react/rating-group"
import { cloneElement, forwardRef, isValidElement } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"
import { For } from "../for"
import { StarIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useRatingGroupStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "ratingGroup" })

export { useRatingGroupStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface RatingGroupRootProviderBaseProps
  extends Assign<
      ArkRatingGroup.RootProviderBaseProps,
      SlotRecipeProps<"ratingGroup">
    >,
    UnstyledProp {}

export interface RatingGroupRootProviderProps
  extends HTMLChakraProps<"div", RatingGroupRootProviderBaseProps> {}

export const RatingGroupRootProvider = withProvider<
  HTMLDivElement,
  RatingGroupRootProviderProps
>(ArkRatingGroup.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RatingGroupRootBaseProps
  extends Assign<ArkRatingGroup.RootBaseProps, SlotRecipeProps<"ratingGroup">>,
    UnstyledProp {}

export interface RatingGroupRootProps
  extends HTMLChakraProps<"div", RatingGroupRootBaseProps> {}

export const RatingGroupRoot = withProvider<
  HTMLDivElement,
  RatingGroupRootProps
>(ArkRatingGroup.Root, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const RatingGroupPropsProvider =
  PropsProvider as React.Provider<RatingGroupRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface RatingGroupLabelProps
  extends HTMLChakraProps<"div", ArkRatingGroup.LabelBaseProps>,
    UnstyledProp {}

export const RatingGroupLabel = withContext<
  HTMLDivElement,
  RatingGroupLabelProps
>(ArkRatingGroup.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RatingGroupItemProps
  extends HTMLChakraProps<"div", ArkRatingGroup.ItemBaseProps>,
    UnstyledProp {}

export const RatingGroupItem = withContext<
  HTMLDivElement,
  RatingGroupItemProps
>(ArkRatingGroup.Item, "item", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RatingGroupItemIndicatorProps extends HTMLChakraProps<"span"> {
  icon?: React.ReactElement | undefined
}

function cloneIcon(icon: React.ReactElement | undefined, type: "bg" | "fg") {
  if (!isValidElement(icon)) return null
  const props = { [`data-${type}`]: "", "aria-hidden": "" }
  return cloneElement(icon, props)
}

export const RatingGroupItemIndicator = forwardRef<
  HTMLSpanElement,
  RatingGroupItemIndicatorProps
>(function RatingGroupItemIndicator(props, ref) {
  const { icon = <StarIcon />, ...rest } = props
  const styles = useRatingGroupStyles()
  const itemState = useRatingGroupItemContext()

  return (
    <chakra.span
      {...rest}
      data-highlighted={itemState.highlighted ? "" : undefined}
      data-checked={itemState.checked ? "" : undefined}
      data-half={itemState.half ? "" : undefined}
      css={[styles.itemIndicator, props.css]}
      ref={ref}
    >
      {cloneIcon(icon, "bg")}
      {cloneIcon(icon, "fg")}
    </chakra.span>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface RatingGroupItemsProps
  extends Omit<RatingGroupItemProps, "index"> {}

export const RatingGroupItems = (props: RatingGroupItemsProps) => {
  const api = useRatingGroupContext()
  return (
    <For each={api.items}>
      {(index) => (
        <RatingGroupItem key={index} index={index} {...props}>
          <RatingGroupItemIndicator />
        </RatingGroupItem>
      )}
    </For>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export interface RatingGroupControlProps
  extends HTMLChakraProps<"div", ArkRatingGroup.ControlBaseProps>,
    UnstyledProp {}

export const RatingGroupControl = withContext<
  HTMLDivElement,
  RatingGroupControlProps
>(ArkRatingGroup.Control, "control", {
  forwardAsChild: true,
  defaultProps: { children: <RatingGroupItems /> },
})

////////////////////////////////////////////////////////////////////////////////////

export const RatingGroupContext = ArkRatingGroup.Context
export const RatingGroupItemContext = ArkRatingGroup.ItemContext
export const RatingGroupHiddenInput = ArkRatingGroup.HiddenInput

export interface RatingGroupValueChangeDetails
  extends ArkRatingGroup.ValueChangeDetails {}

export interface RatingGroupHoverChangeDetails
  extends ArkRatingGroup.HoverChangeDetails {}
