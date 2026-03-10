import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form, InputGroup } from 'react-bootstrap'

export function InputText({ fieldName, placeholder, icon, isLoading, value, onChange, error }) {
    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon={icon} /></InputGroup.Text>
            <Form.Control
                placeholder={placeholder}
                value={value || ''}
                name={fieldName}
                size='md'
                readOnly={isLoading}
                required
                isInvalid={!!error}
                onChange={(e) => onChange(fieldName, e.target.value)}
            />
            {error && (
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    )
}

export function InputTextarea({ fieldName, placeholder, icon, rows, isLoading, value, onChange, error }) {
    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon={icon} /></InputGroup.Text>
            <Form.Control
                as="textarea"
                rows={rows}
                placeholder={placeholder}
                value={value || ''}
                name={fieldName}
                size='md'
                readOnly={isLoading}
                required
                isInvalid={!!error}
                onChange={(e) => onChange(fieldName, e.target.value)}
            />
            {error && (
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    )
}

export function InputSelect({ fieldName, placeholder, icon, isLoading, options, value, onChange, error }) {
    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon={icon} /></InputGroup.Text>
            <Form.Select
                name={fieldName}
                size='md'
                disabled={isLoading}
                required
                isInvalid={!!error}
                value={value || ''}
                onChange={(e) => onChange(fieldName, e.target.value)}
            >
                <option value="">{placeholder}</option>
                {options?.map((option, index) => (
                    <option value={option.id} key={index}>{option.name}</option>
                ))}
            </Form.Select>
            {error && (
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    )
}

export function InputSelectRecursive({ fieldName, placeholder, icon, isLoading, children, value, onChange, error }) {
    return (
        <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon={icon} /></InputGroup.Text>
            <Form.Select
                name={fieldName}
                size='md'
                disabled={isLoading}
                required
                isInvalid={!!error}
                value={value || ''}
                onChange={(e) => onChange(fieldName, e.target.value)}
            >
                <option value="">{placeholder}</option>
                {children}
            </Form.Select>
            {error && (
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            )}
        </InputGroup>
    )
}
