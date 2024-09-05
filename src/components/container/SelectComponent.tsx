import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SelectComponent = ({
  width,
  placeholder,
  onChange,
}: {
  width: string;
  placeholder: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <Select
      name="category"
      onValueChange={(value) => (!onChange ? null : onChange(value))}
      defaultValue=""
    >
      <SelectTrigger className={width}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="drink">Drink</SelectItem>
          <SelectItem value="snack">Snack</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
