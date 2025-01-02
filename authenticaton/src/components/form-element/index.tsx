import { Input } from "../ui/input";

interface CommonFormElementProps {
  currentItem: {
    name: string;
    placeholder?: string;
    componentType: string;
    type?: string;
  };
  value: string; 
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}

function CommonFormElement({ currentItem, value, onChange }: CommonFormElementProps) {
  let content = null;

  switch (currentItem.componentType) {
    case "input":
      content = (
        <Input
          name={currentItem.name}
          id={currentItem.name}
          placeholder={currentItem.placeholder}
          value={value}
          onChange={onChange}
          type={currentItem.type || "text"} 
        />
      );
      break;

    default:
      content = (
        <Input
          name={currentItem.name}
          id={currentItem.name}
          placeholder={currentItem.placeholder}
          value={value}
          onChange={onChange}
        />
      );
      break;
  }

  return content;
}

export default CommonFormElement;
