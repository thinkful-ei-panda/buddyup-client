import React from 'react';

export default function SubmitButton(props) {
	return <button type='submit'>{props.text && props.text}</button>;
}
