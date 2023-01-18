import React, {useCallback, useState} from "react";
import AsyncSelect from "react-select/async";

export const AsyncSelectWithSearch = ({
    requestItems,
    getItemLabel,
    setData,
    defaultValue,
}) => {
    const [items, setItems] = useState([])

    const loadOptions = useCallback(async (term, callback) => {
        if (!term) {
            return
        }
        const itemsList = await requestItems(term)
        setItems(itemsList)
        const options = itemsList.map((item) => {
            return {value: item.id, label: getItemLabel(item)}
        })
        callback(options)
    }, [setItems]);

    const onItemChange = useCallback(async (itemOption) => {
        if (!items.length) {
            return
        }

        const itemsMap = {};
        items.forEach((item) => {
            itemsMap[item.id] = item
        })
        const item = itemsMap[itemOption.value]
        setData(item)
    }, [items]);

    const defaultOption = defaultValue && {value:  defaultValue.id, label: getItemLabel(defaultValue)} || {}

    return <AsyncSelect
            defaultValue={defaultOption}
            cacheOptions={true}
            loadOptions={loadOptions}
            onChange={onItemChange}
        />
}