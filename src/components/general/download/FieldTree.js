import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tree } from 'antd'
import { allowedFields } from '../../../lib/allowedFields'


class FieldTree extends Component {
  state = {
    expandedKeys: ['contact'],
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
      if (item.children) {
        return (
          <Tree.TreeNode
            title={item.title}
            key={item.key}
            dataRef={item}
            selectable={false}
            disabled={item.disabled}
          >
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        )
      }
      return <Tree.TreeNode {...item} selectable={false} />
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
}

export { FieldTree }
