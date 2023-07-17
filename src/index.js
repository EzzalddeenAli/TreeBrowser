import React from "react"
import ReactDOM from "react-dom"
import moment from 'moment'
import {avatarSquare, avatarPortrait, lorem} from "./samplemedia"
import {placeholderImage} from "./samplemedia"
import iconExample from "!svg-inline-loader!./heart_lg.svg"
import 'moment/min/locales'
import {InstUISettingsProvider, View, TextInput, IconButton, IconXSolid, IconCheckSolid, TreeBrowser, IconPlusLine} from "@instructure/ui"

const render = (el) => { ReactDOM.render(el, document.getElementById('app')) }
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true,
      hoveredLine: null
    }
  }

  renderInput = () => {
    const { expanded } = this.state
    if (expanded) {
      return (
        <InstUISettingsProvider
          theme={
            this.state.hoveredLine === 'renderAfter'
              ? {
                  componentOverrides: {
                    View: {
                      focusColorInfo: 'white'
                    },
                    TextInput: {
                      focusOutlineColor: 'white'
                    }
                  }
                }
              : undefined
          }
        >
          <View
            as="div"
            padding="xx-small"
            onFocus={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => this.setState({ hoveredLine: 'renderAfter' })}
            onMouseLeave={() => this.setState({ hoveredLine: 'null' })}
          >
            <TextInput
              placeholder="Enter new group name"
              display="inline-block"
              width="12rem"
              renderLabel=""
              onKeyDown={(e) => {
                e.stopPropagation()
              }}
            />
            <IconButton
              screenReaderLabel="Cancel"
              onClick={(e) => this.setExpand(e, !expanded)}
              onKeyDown={(e) => {
                if (e.code === 'Space' || e.code === 'Enter') {
                  e.preventDefault()
                  this.setExpand(e, !expanded)
                }
              }}
              margin="0 0 0 small"
            >
              <IconXSolid />
            </IconButton>
            <IconButton
              screenReaderLabel="Add new group"
              onClick={(e) => this.setExpand(e, !expanded)}
              onKeyDown={(e) => {
                if (e.code === 'Space' || e.code === 'Enter') {
                  e.preventDefault()
                  this.setExpand(e, !expanded)
                }
              }}
              margin="0 0 0 small"
            >
              <IconCheckSolid />
            </IconButton>
          </View>
        </InstUISettingsProvider>
      )
    }

    return <View as="div">Create New Group</View>
  }

  setExpand = (e, expanded) => {
    e.stopPropagation()
    this.setState({ expanded })
    this._node.focus()
  }

  renderNode = () => {
    const { expanded } = this.state
    return (
      <TreeBrowser.Node
        containerRef={(el) => (this._node = el)}
        onClick={(e) => this.setExpand(e, !expanded)}
        onKeyDown={(e) => {
          if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault()
            this.setExpand(e, !expanded)
          }
        }}
        itemIcon={this.state.expanded ? '' : <IconPlusLine />}
        size="large"
      >
        {this.renderInput()}
      </TreeBrowser.Node>
    )
  }

  render() {
    return (
      <TreeBrowser
        selectionType="single"
        size="large"
        defaultExpanded={[1, 2]}
        collections={{
          1: {
            id: 1,
            name: 'Grade 1',
            collections: [2]
          },
          2: {
            id: 2,
            name: 'Math Outcomes',
            collections: [],
            items: [1, 2],
            descriptor: '1 Group | 2 Outcomes',
            renderAfterItems: this.renderNode()
          }
        }}
        items={{
          1: { id: 1, name: 'Can add' },
          2: { id: 2, name: 'Can subtract' }
        }}
        showRootCollection={true}
        rootId={1}
      />
    )
  }
}

render(<Example/>)