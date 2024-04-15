const AdmProductCard = ({ item }) => {
  return (
    <div className="border rounded p-2">
      <div>{item?.name}</div>
    </div>
  );
};
AdmProductCard.propTypes;

export default AdmProductCard;
