import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tree } from 'antd'
import { allowedFields } from '../../../lib/allowedFields'


class FieldTree extends Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
  }

  onExpand = (expandedKeys) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      const disabled = item.disabled || this.props.disabled
      if (item.children) {
        return (
          <Tree.TreeNode
            title={item.title}
            key={item.key}
            dataRef={item}
            selectable={false}
            disabled={disabled}
          >
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        )
      }
      return <Tree.TreeNode {...item} disabled={disabled} selectable={false} />
    })
  }
  render() {
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.props.onCheck}
        checkedKeys={this.props.checkedKeys}
        selectedKeys={[]}
      >
        {this.renderTreeNodes(allowedFields)}
      </Tree>
    )
  }
}
FieldTree.propTypes = {
  checkedKeys: PropTypes.array.isRequired,
  onCheck: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export { FieldTree }
