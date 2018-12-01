import React from "react";
import { IConnection } from "../../store/applicationState";
import { Link } from "react-router-dom";

interface IConnectionPickerProps {
    id?: string;
    value: any;
    onChange: (value) => void;
    options?: {
        connections: IConnection[],
    };
}

interface IConnectionPickerState {
    value: any;
}

export default class ConnectionPicker extends React.Component<IConnectionPickerProps, IConnectionPickerState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: this.props.value,
        };

        this.onChange = this.onChange.bind(this);
    }

    public componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                value: this.props.value || "",
            });
        }
    }

    public render() {
        const { id, options } = this.props;
        const connections = options.connections || [];

        const { value } = this.state;

        return (
            <div className="input-group">
                <select id={id} value={value} onChange={this.onChange} className="form-control">
                    <option value="">Select Connection</option>
                    {connections.map((connection) =>
                        <option key={connection.id} value={connection.id}>{connection.name}</option>)
                    }
                </select>
                <div className="input-group-append">
                    <Link to="/connections/create" className="btn btn-primary" type="button">Add Connection</Link>
                </div>
            </div>
        );
    }

    private onChange = (e) => {
        const selectedConnection = this.props.options.connections
            .find((connection) => connection.id === e.target.value);

        if (selectedConnection) {
            this.setState({
                value: selectedConnection.id,
            }, () => this.props.onChange(selectedConnection.id));
        }
    }
}
