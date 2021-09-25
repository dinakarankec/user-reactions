import {
    useState
} from 'react';
import styled from 'styled-components';

const Container = styled.button`
    width: 32px;
    height: 32px;
    background: #EDEEF0;
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    cursor: pointer;

    .icon-add-emoji {
        font-size: 15px;
    }
`


const AddReaction: React.VFC = () => {
    const [showEmojis, toggleEmojis] = useState(false);
    return ( <Container>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <i className="icon-add-emoji" />
                </div>
            </Container>
        );
}

export default AddReaction;