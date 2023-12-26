import React from 'react';

type FoldButtonProps = {
    isFold: boolean;
    setIsFold: (isFold: boolean) => void;
};

const FoldButton: React.FC<FoldButtonProps> = ({ isFold, setIsFold }) => {
    return (
        isFold ?
        <button className="unfold-button" onClick={() => setIsFold(!isFold)}>
            {'＞'}
        </button> :
        
        <button className="fold-button" onClick={() => setIsFold(!isFold)}>
            {'＜'}
        </button>
    );
}

export default FoldButton;
