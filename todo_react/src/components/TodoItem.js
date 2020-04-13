import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TodoApi from '../api/todo'
import TodoContext from './TodoContext'



class TodoItem extends Component {
    constructor(props) {
        super(props)
        this.api = new TodoApi()
        let { task, id, done } = this.props.todo
        this.state = {
            // 管理正在编辑/非编辑的状态
            editing: false,
            text: task,
            todo: {
                task,
                id,
                done,
            }
        }
    }


    onEdit = () => {
        this.setState({
            editing: true,
        })
    }

    onDelete = () => {
        let { id } = this.state.todo
        this.api.delete(id, (r) => {
            this.context.onDelete(id)
        })
    }

    updateTodo(todoId, data) {
        this.api.update(todoId, data, (r) => {
            this.setState({
                todo: r,
                editing: false,
            })
            this.updateCounter()
        })
    }

    onSubmit = () => {
        let { id } = this.state.todo
        let text = this.state.text
        let data = {
            task: text
        }
        this.updateTodo(id, data)
    }

    onCancel = () => {
        this.setState({
            editing: false,
        })
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value,
        })
    }

    updateCounter() {
        let func = this.context.onUpdate
        console.log('func is', func, this.state.todo)
        func(this.state.todo)
    }

    toggleComplete = () => {
        let { id, done } = this.state.todo
        let data = {
            done: !done,
        }
        this.updateTodo(id, data)
    }

    render() {
        console.log('this context', this.context)
        let {id, task, done} = this.state.todo
        let todo = null
        if (this.state.editing) {
            todo = (
                <div>
                    <button onClick={this.onSubmit}>提交</button>
                    <button onClick={this.onCancel}>取消</button>
                    <input type="text" value={this.state.text} onChange={this.onChange}/>
                </div>
            )
        } else {
            let text = this.state.todo.done ? '取消完成' : '标记完成'
            todo = (
                <div>
                    <button onClick={this.onEdit}>编辑</button>
                    <button onClick={this.onDelete}>删除</button>
                    <button onClick={this.toggleComplete}>{text}</button>
                    {/*todo 的详细信息*/}
                    <Link to={`/todo/${id}`}>{task}</Link>
                </div>
            )
        }
        let cls = done ? 'todo-complete' : ''
        return (
            <div className={`todo-cell ${cls}`}>
                {todo}
            </div>
        )
    }
}

TodoItem.contextType = TodoContext

export default TodoItem
