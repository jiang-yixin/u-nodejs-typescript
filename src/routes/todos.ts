import { Router } from 'express';

import { Todo } from '../models/todo';

type RequestBody = { text: String };
type RequestParams = { todoId: String };

const router = Router();

let todos: Todo[] = [];

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;

    const todo: Todo = {
        id: new Date().toISOString(),
        text: body.text,
    }

    todos.push(todo);

    res.status(201).json({ message: 'Created todo', todo: todo, todos: todos });
});

router.put('/todo/:todoId', (req, res, next) => {
    const body = req.body as RequestBody;
    const params = req.params as unknown as RequestParams;

    const tid = params.todoId;
    const todoIndex = todos.findIndex(element => element.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: body.text,
        };
        return res.json(200).json({ message: 'Updated post', todo: todos[todoIndex], todos: todos });
    }
    res.status(404).json({ message: 'Not found' });
});

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as unknown as RequestParams;

    todos = todos.filter(element => element.id !== params.todoId);
    res.status(200).json({ message: 'Deleted post', todos: todos });
});

export default router;